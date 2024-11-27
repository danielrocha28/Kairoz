import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/widgets/my_appbar.dart';
import 'package:kairoz/widgets/my_study_topic.dart';
import 'package:kairoz/widgets/my_timer.dart';

class StudyTopicsPage extends StatefulWidget {
  const StudyTopicsPage({super.key});

  @override
  State<StudyTopicsPage> createState() => _StudyTopicsPageState();
}

class _StudyTopicsPageState extends State<StudyTopicsPage> {
  late String topic; // Variável para armazenar o tópico inserido
  List studyTopicsList = [];

  // Função que mostra o pop-up para inserir um novo tópico
  Future<void> showTopicDialog(BuildContext context) async {
    TextEditingController controller =
        TextEditingController(); // Controlador para o TextField

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Digite um Tópico'),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: 'Insira o tópico'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Fecha o pop-up sem salvar
              },
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  topic = controller
                      .text; // Atribui o valor do controller à variável topic
                  studyTopicsList
                      .add([topic]); // Adiciona o novo tópico à lista
                });
                Navigator.of(context).pop(); // Fecha o pop-up
              },
              child: const Text('Salvar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Temporizador'),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showTopicDialog(context); // Chama a função que mostra o pop-up
        },
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
        ),
        backgroundColor: kairozDarkPurple,
        elevation: 6,
        mini: false,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(color: kairozWhite),
        child: Column(
          children: [
            const MyTimer(), // Timer widget
            Expanded(
              child: ListView.builder(
                itemCount: studyTopicsList.length,
                itemBuilder: (context, index) {
                  return StudyTopic(
                    topicName: studyTopicsList[index]
                        [0], // Exibe o tópico na lista
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
