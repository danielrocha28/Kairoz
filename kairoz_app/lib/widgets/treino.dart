import 'package:flutter/material.dart';

class CustomWidget extends StatelessWidget {
  const CustomWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      alignment: Alignment.center,
      widthFactor: 0.97,
      child: Container(
        margin: const EdgeInsets.only(top: 40),
        padding: const EdgeInsets.symmetric(
          vertical: 40,
          horizontal: 20,
        ),
        decoration: BoxDecoration(
          image: const DecorationImage(
            image: AssetImage('assets/fundo1.jpg'),
            fit: BoxFit.fitWidth,
            opacity: 0.5,
          ),
          color: const Color(0xff958DC5),
          borderRadius: BorderRadius.circular(10),
        ),
        child: const Text(
          'Tarefas',
          style: TextStyle(color: Colors.white, fontSize: 25),
        ),
      ),
    );
  }
}
