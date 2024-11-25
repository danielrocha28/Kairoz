import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:kairoz/services/timer_services.dart';

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
  late TimerService _timerService;

  @override
  void initState() {
    super.initState();
    _timerService = TimerService(
        baseUrl: dotenv.env['BASE_URL']!); // URL base carregada do .env
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: kairozWhite),
      child: Column(children: [
        const SizedBox(
          height: 40,
        ),
        Text(
          '$hours:$minutes:$seconds',
          style: const TextStyle(fontSize: 50, fontWeight: FontWeight.w700),
        ),
        const SizedBox(
          height: 10,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            const SizedBox(width: 15),
            IconButton(
              icon: const Icon(Icons.play_circle_outlined, size: 40),
              onPressed: () async {
                print('Iniciando o timer...');
                setState(() {
                  isTimerRunning = true;
                });
                final response =
                    await _timerService.startTimer('1', 'Study for math exam');
                print('Resposta do startTimer: $response');
                // Processar resposta conforme necessário
              },
            ),
            IconButton(
              icon: const Icon(Icons.pause_circle_outlined, size: 40),
              onPressed: () async {
                print('Pausando o timer...');
                final response = await _timerService.pauseTimer();
                print('Resposta do pauseTimer: $response');
                setState(() {
                  isTimerRunning = false;
                });
              },
            ),
            IconButton(
              icon: const Icon(Icons.settings_backup_restore, size: 40),
              onPressed: () async {
                print('Retomando o timer...');
                final response = await _timerService.resumeTimer();
                print('Resposta do resumeTimer: $response');
                setState(() {
                  isTimerRunning = true;
                });
              },
            ),
            IconButton(
              icon: const Icon(Icons.not_started_outlined, size: 40),
              onPressed: () async {
                print('Deletando o timer...');
                final response = await _timerService.deleteTimer();
                print('Resposta do deleteTimer: $response');
                setState(() {
                  isTimerRunning = false;
                });
              },
            ),
            const SizedBox(width: 15),
          ],
        ),
        const SizedBox(
          height: 10,
        )
      ]),
    );
  }
}
