import 'package:flutter/material.dart';
import 'dart:async';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/widgets/my_appbar.dart';

class StudyTopic extends StatelessWidget {
  late String topicName;
  String timerData = "00:00:00"; //valor total do tópico que vai vir do back
  StudyTopic({super.key, required this.topicName, required this.timerData});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(25, 25, 25, 0),
      child: Container(
        padding: const EdgeInsets.fromLTRB(25, 25, 25, 25),
        decoration: const BoxDecoration(
            color: kairozDarkPurple,
            borderRadius: BorderRadius.all(Radius.circular(8))),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              topicName,
              style: const TextStyle(color: Colors.white),
            ),
            Text(
              timerData,
              style: const TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}

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
  final List<String> _studyTopics = [];

  // Controller para pegar o nome do tópico de estudo
  final TextEditingController _controller = TextEditingController();

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

  // Função para adicionar um novo tópico de estudo
  void _addStudyTopic() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _studyTopics.add(_controller.text);
        _controller.clear(); // Limpa o campo de entrada
      });
      Navigator.of(context).pop(); // Fecha o dialog após adicionar o tópico
    }
  }

  // Função para mostrar o dialog para adicionar tópicos
  void _showAddStudyTopicDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Adicionar Tópico de Estudo'),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(hintText: 'Digite o tópico'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Fecha o dialog sem adicionar
              },
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: _addStudyTopic,
              child: const Text('Adicionar'),
            ),
          ],
        );
      },
    );
  }

  @override
  void dispose() {
    _timer.cancel(); // Cancela o timer quando o widget for destruído
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kairozWhite,
      appBar: const MyAppBar(title: 'Kairoz'),
      body: Column(
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
                onPressed: (_hours == 0 &&
                        _minutes == 0 &&
                        _seconds == 0 &&
                        !_isRunning)
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

          const SizedBox(height: 10),

          Container(
            padding: const EdgeInsets.only(left: 10),
            alignment: Alignment.topLeft,
            child: const Text(
              'Tópicos de Estudo',
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
            ),
          ),

          // Lista de tópicos de estudo
          Expanded(
            child: ListView.builder(
              itemCount: _studyTopics.length,
              itemBuilder: (context, index) {
                return StudyTopic(
                  topicName: _studyTopics[index],
                  timerData: '00:00:00',
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddStudyTopicDialog,
        backgroundColor: kairozDarkPurple,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
