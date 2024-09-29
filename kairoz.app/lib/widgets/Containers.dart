import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'Telainformacoes.dart';

class MyCarousel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<Widget> containers = [
      Container(
          margin: const EdgeInsets.symmetric(
              horizontal: 5.0), // Espaço entre os containers
          color: const Color.fromARGB(255, 158, 54, 244),
          height: 200,
          child: GestureDetector(onTap: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => Telainformacoes()));
          })),
      Container(
          margin: const EdgeInsets.symmetric(
              horizontal: 5.0), // Espaço entre os containers
          color: const Color.fromARGB(255, 238, 54, 244),
          height: 200,
          child: GestureDetector(onTap: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => Telainformacoes()));
          })),
      Container(
          margin: const EdgeInsets.symmetric(
              horizontal: 5.0), // Espaço entre os containers
          color: const Color.fromARGB(255, 54, 73, 244),
          height: 200,
          child: GestureDetector(onTap: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => Telainformacoes()));
          })),
      Container(
          margin: const EdgeInsets.symmetric(
              horizontal: 5.0), // Espaço entre os containers
          color: const Color.fromARGB(255, 54, 222, 244),
          height: 200,
          child: GestureDetector(onTap: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => Telainformacoes()));
          })),
      Container(
          margin: const EdgeInsets.symmetric(
              horizontal: 5.0), // Espaço entre os containers
          color: const Color.fromARGB(255, 54, 244, 139),
          height: 200,
          child: GestureDetector(onTap: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => Telainformacoes()));
          })),
    ];

    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: CarouselSlider(
          options: CarouselOptions(
            height: 500.0,
          ), //altura dos containers
          items: containers.map((container) {
            return Builder(
              builder: (BuildContext context) {
                return Container(
                  width: 700, //largaura dos containers
                  child: container,
                );
              },
            );
          }).toList(),
        ),
      ),
    );
  }
}

