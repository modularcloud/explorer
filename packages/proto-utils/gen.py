import os
import subprocess
import json
from git import Repo
from urllib.parse import urlparse
import sys

# Read batches from the file @protobufs.json
with open('protobufs.json') as f:
    data = json.load(f)

# Allow the data (i.e. "celestia") to be selected when the script is run
selected_data = sys.argv[1]
batches = data[selected_data]

# Create a .cached-repos directory if it does not exist
cached_repos_dir = '.cached-repos'
os.makedirs(cached_repos_dir, exist_ok=True)

# Function to compile .proto files
def compile_protos(proto_path, import_paths, ts_output_dir):
    for root, dirs, files in os.walk(proto_path):
        for file in files:
            if file.endswith('.proto'):
                proto_file = os.path.join(root, file)
                cmd = [
                    'protoc',
                    f'--plugin=protoc-gen-ts_proto={os.path.join(os.getcwd(), "../../node_modules", ".bin", "protoc-gen-ts_proto")}',
                    f'--ts_proto_out={ts_output_dir}',
                    f'--ts_proto_opt=esModuleInterop=true,forceLong=long',
                ]
                cmd.extend(['-I' + path for path in import_paths])
                cmd.append(proto_file)
                print(f'Executing command: {" ".join(cmd)}')
                result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                if result.returncode != 0:
                    print(f'Error: {result.stderr}')
                    continue
                print(f'Compiled {proto_file} to TypeScript.')

# Function to create a unique path for each repository based on its URL
def get_unique_repo_path(repo_url):
    parsed_url = urlparse(repo_url)
    path_parts = parsed_url.path.strip('/').split('/')
    unique_path = os.path.join(*path_parts) # This will create a structure like 'org/repo'
    return unique_path

# Function to clone or use cached repositories
def clone_or_use_cached(repo_url, cached_repos_dir):
    unique_repo_path = get_unique_repo_path(repo_url)
    cached_repo_path = os.path.join(cached_repos_dir, unique_repo_path)

    if os.path.isdir(cached_repo_path):
        print(f'Using cached repository: {cached_repo_path}')
    else:
        os.makedirs(cached_repo_path, exist_ok=True)
        print(f'Cloning {repo_url}...')
        Repo.clone_from(repo_url, cached_repo_path)
        print(f'Cloned {repo_url}')
    return cached_repo_path

# Process each batch
for batch in batches:
    batch_name = batch["name"]
    main_repo_url, main_proto_dir = batch["main_repo"]
    dependencies = batch["dependencies"]

    # Define and create the output directory for this batch
    ts_output_dir = os.path.join(selected_data + '-out', batch_name)
    os.makedirs(ts_output_dir, exist_ok=True)

    # Clone or use cached for the main repository
    main_repo_path = clone_or_use_cached(main_repo_url, cached_repos_dir)
    main_import_path = os.path.join(main_repo_path, main_proto_dir)

    # Clone or use cached dependencies
    import_paths = [main_import_path]
    for dep_url, dep_proto_dir in dependencies:
        dep_repo_path = clone_or_use_cached(dep_url, cached_repos_dir)
        import_paths.append(os.path.join(dep_repo_path, dep_proto_dir))

    # Compile protobuf files from the main repository
    print(f'Starting compilation of protobuf files in {main_proto_dir}...')
    compile_protos(os.path.join(main_repo_path, main_proto_dir), import_paths, ts_output_dir)
    print(f'Completed compilation of protobuf files in {main_proto_dir}.')

print('All tasks completed. Check each batch\'s directory inside ts-out for TypeScript files.')