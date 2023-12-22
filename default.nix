let
  pkgs = import <nixpkgs> {};

in
pkgs.mkShell {
  name = "modularcloud";

  buildInputs = with pkgs; [
    (python3.withPackages (ps: with ps; [
      gitpython
      pip
    ]))
    
    nodejs_20
    nodePackages.npm
    protobuf
    redis
  ];
}
