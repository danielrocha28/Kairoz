import 'package:flutter/material.dart';
import 'package:kairoz/widgets/agenda.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Página de Estudos'),
      ),
      body: const Padding(
        padding: EdgeInsets.all(8.0),
        child: CalendarWidget(),
      ),
    );
  }
}
