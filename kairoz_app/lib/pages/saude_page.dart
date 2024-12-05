import 'package:flutter/material.dart';
import 'package:kairoz/widgets/habitos_widget.dart';

class SaudePage extends StatefulWidget {
  const SaudePage({super.key});

  @override
  State<SaudePage> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<SaudePage> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: HabitosWidget(
        text:
            'Praticar exercícios físicos regularmente traz inúmeros benefícios para o corpo e a mente. Eles fortalecem músculos e ossos, melhoram a saúde cardiovascular e ajudam no controle de peso. Além disso, reduzem o estresse, aumentam a autoestima e promovem o bem-estar emocional, combatendo a ansiedade e a depressão. Atividades físicas também aprimoram a memória, a concentração e ajudam a prevenir doenças como Alzheimer e osteoporose. Outro ponto positivo é a melhora da qualidade do sono e o fortalecimento do sistema imunológico, contribuindo para uma vida mais longa e saudável.',
        imageUrl: 'assets/estudos.png',
        title: 'Praticar Exercicios',
      ),
    );
  }
}
