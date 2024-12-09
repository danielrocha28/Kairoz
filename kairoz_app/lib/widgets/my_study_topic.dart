import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/services/study_topics_service.dart';
import 'package:kairoz/widgets/my_stopwatch.dart';

class StudyTopicsList extends StatefulWidget {
  const StudyTopicsList({super.key});

  @override
  State<StudyTopicsList> createState() => _StudyTopicsListState();
}

final TextEditingController _topicTitle = TextEditingController();
final List<String> _studyTopics = [];
final _studyTopicsService = StudyTopicsService();
final _stopwatch = MyStopwatch();

class _StudyTopicsListState extends State<StudyTopicsList> {
  void _addStudyTopic() {
    if (_topicTitle.text.isNotEmpty) {
      _studyTopicsService.createNewTopic(_topicTitle.text);
      setState(() {
        _topicTitle.clear(); // Clean the text field
      });
      Navigator.of(context).pop(); // Close dialog after adding topic
    }
  }

  void showAddStudyTopicDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Adicionar Tópico de Estudo'),
          content: TextField(
            controller: _topicTitle,
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
                onPressed: showAddStudyTopicDialog,
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
            child: FutureBuilder(
          future: _studyTopicsService.getTopicList(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Column(mainAxisSize: MainAxisSize.min, children: [
                SizedBox(
                  height: 15,
                ),
                CircularProgressIndicator()
              ]); // Exibe indicador de carregamento
            } else if (snapshot.hasError) {
              return Text('Erro: ${snapshot.error}');
            } else {
              final topics = snapshot.data as List<Map<String, String>>;

              return ListView.builder(
                itemCount: topics.length,
                itemBuilder: (context, index) {
                  final topic = topics[index];
                  return StudyTopic(
                    topicName: topic['title'] ?? 'Sem título',
                    timerData: topic['totalTime'] ?? '00:00:00',
                  );
                },
              );
            }
          },
        )),
      ],
    );
  }
}

class StudyTopic extends StatelessWidget {
  String topicName;
  String timerData; //valor total do tópico que vai vir do back

  StudyTopic({super.key, required this.topicName, required this.timerData});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Container(
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
    );
  }
}
