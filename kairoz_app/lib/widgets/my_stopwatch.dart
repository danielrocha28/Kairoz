import 'package:flutter/material.dart';
import 'dart:async';
import 'package:kairoz/app_colors/app_colors.dart';

class MyStopwatch extends StatefulWidget {
  const MyStopwatch({super.key});
  @override
  State<MyStopwatch> createState() => _MyStopwatch();
}

class _MyStopwatch extends State<MyStopwatch> {
  int _seconds = 0;
  int _minutes = 0;
  int _hours = 0;
  late Timer _timer;
  bool _isRunning = false;
  late String _actualTime;
  late String _weekDay;

  @override
  void initState() {
    super.initState();
  }

  // Função para iniciar o temporizador
  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _seconds++;
        if (_seconds == 60) {
          _seconds = 0;
          _minutes++;
        }
        if (_minutes == 60) {
          _minutes = 0;
          _hours++;
        }
      });
    });
    setState(() {
      _isRunning = true;
    });
  }

  // Função para pausar o temporizador
  void _pauseTimer() {
    _timer.cancel();
    setState(() {
      _isRunning = false;
    });
  }

  // Função para resetar o temporizador
  void _resetTimer() {
    _timer.cancel();
    setState(() {
      _isRunning = false;
      _seconds = 0;
      _minutes = 0;
      _hours = 0;
    });
  }

  String getActualTimer() {
    _actualTime = "$_hours:$_minutes:$_seconds";
    return _actualTime;
  }

  String getWeekDay() {
    DateTime now = DateTime.now();
    List<String> days = [
      'Segunda-feira', //1
      'Terça-feira', //2
      'Quarta-feira', //3
      'Quinta-feira', //4
      'Sexta-feira', //4
      'Sábado', //5
      'Domingo' //6
    ];
    _weekDay = days[now.weekday - 1];
    return _weekDay;
  }

  @override
  void dispose() {
    if (_timer.isActive) {
      _timer.cancel();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Exibe o tempo do cronômetro no topo
        Padding(
          padding: const EdgeInsets.fromLTRB(50, 20, 50, 0),
          child: Container(
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(20)),
            padding: const EdgeInsets.all(20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '${_hours.toString().padLeft(2, '0')}:',
                  style: const TextStyle(
                      fontSize: 50, fontWeight: FontWeight.w700),
                ),
                Text(
                  '${_minutes.toString().padLeft(2, '0')}:',
                  style: const TextStyle(
                      fontSize: 50, fontWeight: FontWeight.w700),
                ),
                Text(
                  _seconds.toString().padLeft(2, '0'),
                  style: const TextStyle(
                      fontSize: 50, fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 10),

        // Botões para controlar o temporizador
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
              onPressed:
                  (_hours == 0 && _minutes == 0 && _seconds == 0 && !_isRunning)
                      ? _startTimer
                      : null,
              icon: const Icon(Icons.play_circle_outlined, size: 50),
              color: kairozDarkPurple,
            ),
            const SizedBox(width: 10),
            IconButton(
              onPressed: _isRunning
                  ? _pauseTimer
                  : (_hours != 0 || _minutes != 0 || _seconds != 0
                      ? _startTimer
                      : null),
              icon: Icon(
                _isRunning
                    ? Icons.pause_circle_outlined
                    : Icons.not_started_outlined,
                size: 50,
              ),
              color: kairozDarkPurple,
            ),
            const SizedBox(width: 10),
            IconButton(
              onPressed:
                  _isRunning || _hours != 0 || _minutes != 0 || _seconds != 0
                      ? _resetTimer
                      : null,
              icon: const Icon(Icons.settings_backup_restore, size: 50),
              color: kairozDarkPurple,
            ),
          ],
        ),
      ],
    );
  }
}
