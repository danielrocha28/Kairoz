import 'package:flutter/material.dart';

class SaudePage extends StatefulWidget {
  const SaudePage({super.key});

  @override
  State<SaudePage> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<SaudePage> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Bem-vindo à página de Saúde!'),
    );
  }
}
