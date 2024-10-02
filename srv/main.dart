import 'package:flutter/material.dart';
import 'package:flutter_application_1/calendario.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Column(
          children: [
            const Calendario(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.white),
                  child: const Column(
                    children: [
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                      ),
                      Text('Editar', style: TextStyle(color: Colors.black),),
                    ],
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    ),
  );
}
