import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/services/study_topics_service.dart';

class StudyTopicsList extends StatefulWidget {
  const StudyTopicsList({super.key});

  @override
  State<StudyTopicsList> createState() => _StudyTopicsListState();
}

final TextEditingController topicTitle = TextEditingController();
final _studyTopicsService = StudyTopicsService();
late Future<List<Map<String, String>>> _futureTopics;

class _StudyTopicsListState extends State<StudyTopicsList> {
  @override
  void initState() {
    super.initState();
    _futureTopics = _studyTopicsService.getTopicList();
  }

  void _addStudyTopic() async {
    if (topicTitle.text.isNotEmpty) {
      // Get the actual topics
      final topics = await _studyTopicsService.getTopicList();

      // Verify if the topic already exists
      final topicExists = topics.any((topic) =>
          topic['title']?.toLowerCase() == topicTitle.text.toLowerCase());

      if (topicExists) {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Tópico já existe'),
            content: const Text('Esse tópico já foi adicionado.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('OK'),
              ),
            ],
          ),
        );
        return;
      }

      // If it doesn't exists already, creates the topic
      await _studyTopicsService.createNewTopic(topicTitle.text);
      await Future.delayed(const Duration(seconds: 1));

      setState(() {
        topicTitle.clear();
        _futureTopics = _studyTopicsService.getTopicList();
      });
      Navigator.of(context).pop();
    }
  }

  void showAddStudyTopicDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Adicionar Tópico de Estudo'),
          content: TextField(
            controller: topicTitle,
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
          alignment: Alignment.topLeft,
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Tópicos de Estudo',
                    style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
                  ),
                  ElevatedButton(
                    onPressed: _studyTopicsService.addTimeToTopic,
                    style: ElevatedButton.styleFrom(
                      backgroundColor:
                          kairozDarkPurple, // Define a cor de fundo
                    ),
                    child: const Icon(Icons.add, color: Colors.white),
                  ),
                ],
              ),
              SizedBox(
                height: 20,
              )
            ],
          ),
        ),
        // Lista de tópicos de estudo
        Expanded(
            child: FutureBuilder(
          future: _futureTopics,
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
  final String topicName;
  final String timerData;
  final _studyTopicsService = StudyTopicsService();

  StudyTopic({super.key, required this.topicName, required this.timerData});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Container(
        padding: const EdgeInsets.fromLTRB(25, 25, 25, 25),
        decoration: const BoxDecoration(
            color: kairozDarkPurple,
            borderRadius: BorderRadius.all(Radius.circular(8))),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  topicName,
                  style: const TextStyle(color: Colors.white, fontSize: 16),
                ),
                Text(
                  timerData,
                  style: const TextStyle(color: Colors.white, fontSize: 12),
                ),
              ],
            ),
            IconButton(
                icon: const Icon(Icons.save, color: Colors.white),
                onPressed: () {
                  _studyTopicsService.addTimeToTopic;
                  print(topicName);
                }),
          ],
        ),
      ),
    );
  }
}
