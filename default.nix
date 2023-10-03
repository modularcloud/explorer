let
  pkgs = import <nixpkgs> {};

in
pkgs.mkShell {
  name = "modularcloud";

  buildInputs = with pkgs; [
    nodejs_18
    nodePackages.npm
    protobuf
  ];
}
