import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class Calendario extends StatelessWidget {
  const Calendario({super.key});
  @override
  Widget build(context) {
    return TableCalendar(
        focusedDay: DateTime.now(),
        firstDay: DateTime.utc(2010, 10, 07),
        lastDay: DateTime.utc(2030, 10, 07));
  }
}
