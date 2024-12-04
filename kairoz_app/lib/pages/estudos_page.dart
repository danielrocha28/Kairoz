import 'package:flutter/material.dart';
import 'package:kairoz/widgets/my_stopwatch.dart';
import 'package:kairoz/pages/study_topics_page.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(25),
        child: ElevatedButton(
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const StudyTopicsPage()));
            },
            child: const Text('Temporizador')),
      ),
    );
  }
}
