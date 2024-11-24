import 'package:flutter/material.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: ElevatedButton(
        onPressed: () => {
          Navigator.pushNamed(context, '/agenda'),
        },
        child: const Text(
          'Bora pra agenda',
        ),
      ),
    );
  }
}
