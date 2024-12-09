import 'package:flutter/material.dart';
import 'package:kairoz/widgets/meta_sono.dart'; // Certifique-se de que a importação está correta

class SleepingPage extends StatefulWidget {
  const SleepingPage({super.key});

  @override
  State<SleepingPage> createState() => _SleepingPageState();
}

class _SleepingPageState extends State<SleepingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffE4E1F3),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SleepGoalSetter(),
          ],
        ),
      ),
    );
  }
}
