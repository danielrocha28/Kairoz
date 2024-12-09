import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SleepGoalSetter extends StatefulWidget {
  @override
  _SleepGoalSetterState createState() => _SleepGoalSetterState();
}

class _SleepGoalSetterState extends State<SleepGoalSetter> {
  TextEditingController _goalController = TextEditingController();
  String _sleepGoal = '';
  bool _goalSaved = false;
  String errorMessage = '';

  final TextInputFormatter _timeFormatter = TextInputFormatter.withFunction(
    (oldValue, newValue) {
      String newText = newValue.text.replaceAll(RegExp(r'[^0-9]'), '');
      if (newText.length >= 3) {
        newText =
            '${newText.substring(0, 2)}:${newText.substring(2, newText.length)}';
      }
      if (newText.length > 5) {
        newText = newText.substring(0, 5);
      }
      return TextEditingValue(
        text: newText,
        selection: TextSelection.collapsed(offset: newText.length),
      );
    },
  );
  void _saveGoal() {
    String goal = _goalController.text.replaceAll(':', '');
    if (goal.length < 4) {
      setState(() {
        errorMessage = 'Por favor, insira um horário válido (HH:MM)';
      });
      return;
    }

    int hours = int.tryParse(goal.substring(0, 2)) ?? 0;
    int minutes = int.tryParse(goal.substring(2, 4)) ?? 0;

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      setState(() {
        _sleepGoal =
            '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}';
        _goalSaved = true;
        errorMessage = '';
      });
      _goalController.clear();
    } else {
      setState(() {
        errorMessage = 'O horário deve estar entre 00:00 e 23:59';
      });
    }
  }

  void _resetGoal() {
    setState(() {
      _goalSaved = false;
      _sleepGoal = '';
      errorMessage = '';
    });
  }

  @override
  void dispose() {
    _goalController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (!_goalSaved) ...[
            Center(
              child: Text(
                'Meta de Sono',
                style: TextStyle(fontSize: 24),
              ),
            ),
            SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20.0),
              child: Text(
                'Um bom descanso é sempre importante. Defina uma meta para melhorar a sua rotina!',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.grey[700]),
              ),
            ),
          ],
          if (!_goalSaved) ...[
            TextField(
              controller: _goalController,
              keyboardType: TextInputType.number,
              inputFormatters: [_timeFormatter],
              maxLength: 5,
              decoration: InputDecoration(
                labelText: 'Quantas horas de sono você deseja?',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                contentPadding:
                    EdgeInsets.symmetric(vertical: 18, horizontal: 18),
                errorText: errorMessage.isEmpty ? null : errorMessage,
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _saveGoal,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 82, 22, 185),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32),
                ),
                padding: EdgeInsets.symmetric(vertical: 12, horizontal: 20),
              ),
              child: Text(
                'Salvar',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
            ),
          ],
          if (_goalSaved) ...[
            SizedBox(height: 40),
            Text(
              'Você precisa atingir a meta de $_sleepGoal horas de sono!',
              style: TextStyle(
                fontSize: 20,
                color: const Color.fromARGB(255, 0, 0, 0),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _resetGoal,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 82, 22, 185),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                padding: EdgeInsets.symmetric(vertical: 16),
              ),
              child: Text(
                'Redefinir Meta',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
