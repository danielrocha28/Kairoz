import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/services/study_topics_service.dart';

class StudyTopic extends StatelessWidget {
  late String topicName;
  String timerData = "00:00:00"; //valor total do tópico que vai vir do back

  StudyTopic({super.key, required this.topicName, required this.timerData});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        mainAxisSize: MainAxisSize.max,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(25, 25, 25, 25),
            decoration: const BoxDecoration(
                color: kairozDarkPurple,
                borderRadius: BorderRadius.all(Radius.circular(8))),
            child: Row(
              mainAxisSize: MainAxisSize.max,
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
          const IconButton(
            onPressed: null,
            icon: Icon(Icons.add_circle_outline, size: 50),
            color: kairozDarkPurple,
          ),
        ],
      ),
    );
  }
}

class StudyTopicsList extends StatefulWidget {
  const StudyTopicsList({super.key});

  @override
  State<StudyTopicsList> createState() => _StudyTopicsListState();
}

final TextEditingController _controller = TextEditingController();
final List<String> _studyTopics = [];
final _studyTopicsService = StudyTopicsService();

class _StudyTopicsListState extends State<StudyTopicsList> {
  void showAddStudyTopicDialog() {
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
                Navigator.of(context).pop(); // Close dialog without adding
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

  void _addStudyTopic() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _studyTopics.add(_controller.text);
        _controller.clear(); // Clean the text field
      });
      Navigator.of(context).pop(); // Close dialog after adding topic
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.only(left: 10),
          alignment: Alignment.topLeft,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Tópicos de Estudo',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
              ),
              ElevatedButton(
                onPressed: () async {
                  final result = await _studyTopicsService.getTopicList();
                  print(result); // Ou use o resultado como quiser
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: kairozDarkPurple, // Define a cor de fundo
                ),
                child: const Icon(Icons.add, color: Colors.white),
              ),
            ],
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
    );
  }
}
