import 'package:flutter/material.dart';

class LazerPage extends StatefulWidget {
  const LazerPage({super.key});

  @override
  State<LazerPage> createState() => _LazerPageState();
}

class _LazerPageState extends State<LazerPage> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Bem-vindo à página de Lazer!'),
    );
  }
}
