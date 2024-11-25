import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';

class StudyTopic extends StatelessWidget {
  final String topicName;
  const StudyTopic({super.key, required this.topicName});

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
            const IconButton(
                onPressed: null,
                icon: Icon(
                  Icons.arrow_forward_rounded,
                  color: Colors.white,
                ))
          ],
        ),
      ),
    );
  }
}
