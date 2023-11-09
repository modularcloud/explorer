import os
import subprocess
import shutil
from git import Repo
from urllib.parse import urlparse

# Function to compile .proto files
def compile_protos(proto_path, import_paths, ts_output_dir):
    # Print the current working directory
    print(f'Current working directory: {os.getcwd()}')
    for root, dirs, files in os.walk(proto_path):
        for file in files:
            if file.endswith('.proto'):
                proto_file = os.path.join(root, file)
                # Print import paths
                print(f'Import paths: {import_paths}')
                # Print the proto file path
                print(f'Proto file path: {proto_file}')
                cmd = [
                    'protoc',
                    f'--plugin=protoc-gen-ts_proto={os.path.join(os.getcwd(), "../../node_modules", ".bin", "protoc-gen-ts_proto")}',
                    f'--ts_proto_out={ts_output_dir}',
                    f'--ts_proto_opt=esModuleInterop=true,forceLong=long',
                ]
                # Adding the root directory to import paths to resolve all paths
                cmd.extend(['-I' + path for path in import_paths + [os.getcwd()]])
                cmd.append(proto_file)
                print(f'Executing command: {" ".join(cmd)}')
                result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                if result.returncode != 0:
                    print(f'Error: {result.stderr}')
                    continue
                print(f'Compiled {proto_file} to TypeScript.')

# Function to process a single repository
def process_repo(repo_url, proto_dir, is_dependency, ts_output_base, import_paths):
    # Parse the repo URL to create a path structure
    path_parts = urlparse(repo_url).path.strip('/').split('/')
    repo_name = path_parts[-1] if path_parts else repo_url.split('/')[-1]

    # Clone the repository
    if os.path.isdir(repo_name):
        print(f'Cleaning up existing directory: {repo_name}')
        shutil.rmtree(repo_name)
    print(f'Cloning {repo_url}...')
    Repo.clone_from(repo_url, repo_name)
    print(f'Cloned {repo_url}')

    # Add the repo's proto directory to import paths if it's a dependency
    repo_proto_path = os.path.join(os.getcwd(), repo_name, proto_dir if proto_dir != '.' else '')
    if is_dependency and repo_proto_path not in import_paths:
        import_paths.append(repo_proto_path)

    # Add the root of the cloned repository to the import paths if not already added
    repo_root_path = os.path.join(os.getcwd(), repo_name)
    if repo_root_path not in import_paths:
        import_paths.append(repo_root_path)

    # Compile proto files if it's not a dependency
    if not is_dependency:
        ts_output_dir = os.path.join(ts_output_base, *path_parts[-2:])
        os.makedirs(ts_output_dir, exist_ok=True)
        proto_path = os.path.join(repo_name, proto_dir if proto_dir != '.' else '')
        compile_protos(proto_path, import_paths, ts_output_dir)

# Process each batch of repositories
def process_batches(batches, ts_output_base):
    for batch in batches:
        import_paths = []
        # First, process all dependencies
        for repo_url, proto_dir, is_dependency in batch:
            if is_dependency:
                process_repo(repo_url, proto_dir, is_dependency, ts_output_base, import_paths)
        # Then, process all non-dependencies
        for repo_url, proto_dir, is_dependency in batch:
            if not is_dependency:
                process_repo(repo_url, proto_dir, is_dependency, ts_output_base, import_paths)

# List of batches, each batch is a list of repos with their details
batches = [
    [
        ('https://github.com/cosmos/gogoproto', '.', True),
        ('https://github.com/celestiaorg/celestia-app', 'proto', False),
        # ... more dependencies if any
    ],
    # ... more batches if any
]

# Base directory for TypeScript output
ts_output_base = 'ts-out'
os.makedirs(ts_output_base, exist_ok=True)

# Process each batch
process_batches(batches, ts_output_base)

# Clean up repositories
for batch in batches:
    for repo_url, _, _ in batch:
        repo_name = urlparse(repo_url).path.strip('/').split('/')[-1]
        print(f'Cleaning up repository: {repo_name}')
        shutil.rmtree(repo_name)

print('All tasks completed. Check the ts-out directory for TypeScript files.')
