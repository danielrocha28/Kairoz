import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/widgets/my_appbar.dart';
import 'package:kairoz/widgets/my_stopwatch.dart';
import 'package:kairoz/widgets/my_study_topic.dart';

class StudyTopicsPage extends StatefulWidget {
  const StudyTopicsPage({super.key});

  @override
  State<StudyTopicsPage> createState() => _StudyTopicsPageState();
}

class _StudyTopicsPageState extends State<StudyTopicsPage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: kairozWhite,
      appBar: MyAppBar(title: 'Kairoz'),
      body: Column(
        children: [
          MyStopwatch(),
          Expanded(
            child: Padding(
                padding: EdgeInsets.fromLTRB(25, 25, 25, 0),
                child: StudyTopicsList()),
          )
        ],
      ),
    );
  }
}
