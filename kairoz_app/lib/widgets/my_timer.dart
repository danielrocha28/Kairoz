import 'package:flutter/material.dart';
import 'package:kairoz/services/timer_services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class MyTimer extends StatefulWidget {
  const MyTimer({super.key});

  @override
  State<MyTimer> createState() => _MyTimerState();
}

class _MyTimerState extends State<MyTimer> {
  String hours = '00';
  String minutes = '00';
  String seconds = '00';
  bool isTimerRunning = false;

  final TimerService _timerService = TimerService(
    idTask: '123',
    title: 'Minha Tarefa',
    baseUrl: dotenv.load(fileName: ".env").toString(),
  );

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const SizedBox(
        height: 40,
      ),
      Text(
        '$hours:$minutes:$seconds',
        style: const TextStyle(fontSize: 30),
      ),
      const SizedBox(
        height: 40,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
            onPressed: () async {
              isTimerRunning = true;
              String result = await _timerService.start();
            },
            child: const Text('Iniciar'),
          ),
          const SizedBox(
            width: 10,
          ),
          ElevatedButton(
            onPressed: () async {
              isTimerRunning = false;
              String result = await _timerService.pause();
            },
            child: const Text('Pausar'),
          ),
          const SizedBox(
            width: 10,
          ),
          ElevatedButton(
              onPressed: () async {
                isTimerRunning = true;
                String result = await _timerService.resume();
              },
              child: const Text('Resumir')),
          const SizedBox(
            width: 10,
          ),
          ElevatedButton(
              onPressed: () async {
                isTimerRunning = false;
                String result = await _timerService.delete();
              },
              child: const Text('Deletar')),
        ],
      ),
    ]);
  }
}
