import 'package:flutter/material.dart';
import 'dart:async';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/services/task_create.service.dart';
import 'package:kairoz/models/task.dart';

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

  late String _weekDay;
  late String addTimeToThisTopic;

  @override
  void initState() {
    super.initState();
  }

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

  void _pauseTimer() {
    _timer.cancel();
    setState(() {
      _isRunning = false;
    });
  }

  void _resetTimer() {
    _timer.cancel();
    setState(() {
      _isRunning = false;
      _seconds = 0;
      _minutes = 0;
      _hours = 0;
    });
  }

  String getWeekDay() {
    DateTime now = DateTime.now();
    List<String> days = [
      'seg', //1
      'ter', //2
      'qua', //3
      'qui', //4
      'sex', //4
      'sab', //5
      'dom' //6
    ];
    _weekDay = days[now.weekday - 1];
    return _weekDay;
  }

  void _deleteTask(Task task) async {
    final service = TaskDeleteService(
      id: task.id ?? 0,
    );
    print(task.id);
    try {
      await service.deleteTask();

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Tarefa deletada com sucesso!'),
          backgroundColor: Colors.green,
        ),
      );

      Navigator.pop(context, task);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro ao deletar tarefa!'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      // Shows the stopwatch's time on top
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(50, 20, 50, 0),
          child: Container(
            decoration: BoxDecoration(
                color: Colors.transparent,
                borderRadius: BorderRadius.circular(10)),
            padding: const EdgeInsets.all(20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '${_hours.toString().padLeft(2, '0')}:',
                  style: const TextStyle(
                    fontSize: 50,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  '${_minutes.toString().padLeft(2, '0')}:',
                  style: const TextStyle(
                    fontSize: 50,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  _seconds.toString().padLeft(2, '0'),
                  style: const TextStyle(
                    fontSize: 50,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 10),

        // Stopwatch buttons
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
