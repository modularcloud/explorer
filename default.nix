let
  pkgs = import <nixpkgs> {};

in
pkgs.mkShell {
  name = "modularcloud";

  buildInputs = with pkgs; [
    nodejs_20
    nodePackages.npm
    protobuf
  ];
}
