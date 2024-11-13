import 'package:flutter/material.dart';
import 'package:kairoz/widgets/my_appbar.dart';
import 'package:kairoz/widgets/my_timer.dart';

class TimerPage extends StatefulWidget {
  const TimerPage({super.key});

  @override
  State<TimerPage> createState() => _TimerPageState();
}

class _TimerPageState extends State<TimerPage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: MyAppBar(title: 'Timer'),
      body: Center(
        child: MyTimer(),
      ),
    );
  }
}
