import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class Calendario extends StatelessWidget {
  const Calendario({super.key});
  @override
  Widget build(context) {
    return Column(
      children: [
        TableCalendar(
            focusedDay: DateTime.now(),
            firstDay: DateTime.utc(2010, 10, 07),
            lastDay: DateTime.utc(2030, 10, 07)),
        const Texto1(),
      ],
    );
  }
}

class Texto1 extends StatelessWidget {
  const Texto1({super.key});
  @override
  Widget build(context) {
    return const Text('viados e viadas');
  }
}
