import os
import subprocess
import shutil
from git import Repo

# Define your list of repositories, proto directories, and dependency flags
repos = [
    ('https://github.com/celestiaorg/celestia-app', 'proto', False),
    ('https://github.com/cosmos/gogoproto', '.', True),
    # ('https://github.com/celestiaorg/cosmos-sdk', 'proto', False),

    # Add more tuples with (repo_url, proto_dir, is_dependency)
]

# Define the output directory for TypeScript files
ts_output_dir = 'ts-out'
os.makedirs(ts_output_dir, exist_ok=True)

# Function to compile .proto files
def compile_protos(proto_path, import_paths):
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

# Clone repositories and prepare import paths for proto compilation
import_paths = []
for repo_url, proto_dir, is_dependency in repos:
    repo_name = repo_url.split('/')[-1]
    if os.path.isdir(repo_name):
        print(f'Cleaning up existing directory: {repo_name}')
        shutil.rmtree(repo_name)
    print(f'Cloning {repo_url}...')
    Repo.clone_from(repo_url, repo_name)
    print(f'Cloned {repo_url}')
    import_paths.append(os.path.join(repo_name, proto_dir))

# Compile protobuf files in non-dependency repos
for repo_url, proto_dir, is_dependency in repos:
    if not is_dependency:
        repo_name = repo_url.split('/')[-1]
        proto_path = os.path.join(repo_name, proto_dir)
        print(f'Starting compilation of protobuf files in {proto_dir}...')
        compile_protos(proto_path, import_paths)
        print(f'Completed compilation of protobuf files in {proto_dir}.')

# Clean up repositories
for repo_url, _, _ in repos:
    repo_name = repo_url.split('/')[-1]
    print(f'Cleaning up repository: {repo_name}')
    shutil.rmtree(repo_name)
    print(f'Cleaned up repository: {repo_name}')

print('All tasks completed. TypeScript files are in the directory:', ts_output_dir)
