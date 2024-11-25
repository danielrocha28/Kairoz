import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/widgets/my_study_topic.dart';
import 'package:kairoz/widgets/my_appbar.dart';
import 'package:kairoz/widgets/my_timer.dart';

class StudyTopicsPage extends StatefulWidget {
  const StudyTopicsPage({super.key});

  @override
  State<StudyTopicsPage> createState() => _StudyTopicsPageState();
}

class _StudyTopicsPageState extends State<StudyTopicsPage> {
  List studyTopicsList = [
    ['Flutter'],
    ['Dart'],
    ['Java'],
    ['PHP'],
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: kairozWhite),
      child: Column(
        children: [
          const MyTimer(), //Timer widget
          Expanded(
            child: ListView.builder(
              itemCount: studyTopicsList.length,
              itemBuilder: (context, index) {
                return StudyTopic(
                  topicName: studyTopicsList[index][0],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
