import os
import subprocess
import shutil
from git import Repo

# Define your batches with a main repository and dependencies
batches = [
    {
        "main_repo": ('https://github.com/celestiaorg/celestia-app', 'proto'),
        "dependencies": [
            ('https://github.com/cosmos/gogoproto', '.'),
            # Add more dependency tuples as needed
        ]
    },
    # Add more batches as needed
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

# Process each batch
for batch in batches:
    main_repo_url, main_proto_dir = batch["main_repo"]
    dependencies = batch["dependencies"]

    # Clone and compile for the main repository
    main_repo_name = main_repo_url.split('/')[-1]
    if os.path.isdir(main_repo_name):
        print(f'Using existing directory: {main_repo_name}')
    else:
        print(f'Cloning main repository {main_repo_url}...')
        Repo.clone_from(main_repo_url, main_repo_name)
        print(f'Cloned {main_repo_url}')
    main_import_path = os.path.join(main_repo_name, main_proto_dir)

    # Clone dependencies if they don't exist
    for dep_url, dep_proto_dir in dependencies:
        dep_name = dep_url.split('/')[-1]
        if not os.path.isdir(dep_name):
            print(f'Cloning dependency {dep_url}...')
            Repo.clone_from(dep_url, dep_name)
            print(f'Cloned {dep_url}')

    # Prepare import paths with dependencies
    import_paths = [main_import_path] + [os.path.join(dep.split('/')[-1], proto_dir) for dep, proto_dir in dependencies]

    # Compile protobuf files from the main repository
    print(f'Starting compilation of protobuf files in {main_proto_dir}...')
    compile_protos(os.path.join(main_repo_name, main_proto_dir), import_paths)
    print(f'Completed compilation of protobuf files in {main_proto_dir}.')

print('All tasks completed. TypeScript files are in the directory:', ts_output_dir)
