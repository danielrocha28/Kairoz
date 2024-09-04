import 'package:flutter/material.dart';
import 'package:kairoz/calendario.dart';

void main() {
  runApp(const MaterialApp(
    debugShowCheckedModeBanner: false,
    home: Row(
      children: [
        Calendario(),
        Calendario(),
        Texto1(),
        Texto1(),
      ],
    ),
  ));
}
