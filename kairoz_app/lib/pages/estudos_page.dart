import 'package:flutter/material.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:kairoz/widgets/treino.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: const Column(
        children: [
          SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: WeekDisplay(),
          ),
          CustomWidget(),
        ],
      ),
    );
  }
}
