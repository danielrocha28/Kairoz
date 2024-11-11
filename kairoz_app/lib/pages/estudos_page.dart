import 'package:flutter/material.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Bem-vindo à página de Estudos!'),
    );
  }
}
