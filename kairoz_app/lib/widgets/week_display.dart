import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:kairoz/pages/agenda_page.dart';

class KairozDate extends StatelessWidget {
  final String dateNumber;
  final String dateName;
  final bool active;

  const KairozDate({
    super.key,
    required this.dateNumber,
    required this.dateName,
    required this.active,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          CupertinoPageRoute(
            builder: (context) => const AgendaPage(),
          ),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          color: active
              ? const Color.fromARGB(255, 82, 22, 185)
              : const Color.fromARGB(255, 130, 118, 198),
        ),
        padding: const EdgeInsets.symmetric(
          vertical: 12,
          horizontal: 8,
        ),
        child: Column(
          children: [
            Text(
              dateName.substring(0, 3),
              style: const TextStyle(
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 3),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                color: Colors.white,
              ),
              padding: const EdgeInsets.all(10),
              child: Text(
                dateNumber,
                style: TextStyle(
                  fontSize: 18,
                  color: active
                      ? const Color.fromARGB(255, 82, 22, 185)
                      : const Color(0xff958DC5),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WeekDisplay extends StatelessWidget {
  const WeekDisplay({super.key});

  @override
  Widget build(BuildContext context) {
    final today = DateTime.now();
    final daysOfWeek = _getCurrentWeek(today);

    return Row(
      children: daysOfWeek.map((day) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 9.0),
          child: KairozDate(
            dateName: _getWeekdayName(day),
            dateNumber: day.day.toString().padLeft(2, '0'),
            active: day == today,
          ),
        );
      }).toList(),
    );
  }

  List<DateTime> _getCurrentWeek(DateTime date) {
    return List.generate(7, (index) => date.add(Duration(days: index)));
  }

  String _getWeekdayName(DateTime date) {
    const days = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    return days[date.weekday % 7];
  }
}
