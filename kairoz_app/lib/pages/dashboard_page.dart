import 'package:flutter/material.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<DashboardPage> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Bem-vindo à Home Page!'),
    );
  }
}
