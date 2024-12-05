import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; 

class SleepTracker extends StatefulWidget {
  @override
  _SleepTrackerState createState() => _SleepTrackerState();
}

class _SleepTrackerState extends State<SleepTracker> {
  TextEditingController _sleepTimeController = TextEditingController();
  TextEditingController _wakeUpTimeController = TextEditingController();

  
  List<Map<String, String>> _sleepRecords = [];

  
  void _saveSleepData() {
    final String sleepTime = _sleepTimeController.text;
    final String wakeUpTime = _wakeUpTimeController.text;

    if (sleepTime.isNotEmpty && wakeUpTime.isNotEmpty) {
      final String currentDate = DateFormat('dd/MM/yyyy').format(DateTime.now()); 

      setState(() {
        _sleepRecords.add({
          'date': currentDate,
          'sleepTime': sleepTime,
          'wakeUpTime': wakeUpTime,
        });
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Horários registrados com sucesso!')),
      );

      
      _sleepTimeController.clear();
      _wakeUpTimeController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Digite a hora que você foi dormir:',
              style: TextStyle(fontSize: 18, color: const Color.fromARGB(255, 49, 49, 49)),
            ),
            SizedBox(height: 10),
            TextField(
              controller: _sleepTimeController,
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.grey[200],
                labelText: 'Digite a hora (hh:mm)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: BorderSide.none,
                ),
                contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 15),
              ),
              keyboardType: TextInputType.datetime,
            ),
            SizedBox(height: 16),
            Text(
              'Digite a hora que você acordou:',
              style: TextStyle(fontSize: 18, color: const Color.fromARGB(255, 49, 49, 49)),
            ),
            SizedBox(height: 10),
            TextField(
              controller: _wakeUpTimeController,
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.grey[200],
                labelText: 'Digite a hora (hh:mm)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: BorderSide.none,
                ),
                contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 15),
              ),
              keyboardType: TextInputType.datetime,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _saveSleepData,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 117, 0, 150),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                padding: EdgeInsets.symmetric(vertical: 16),
              ),
              child: Text(
                'Registrar Horários',
                style: TextStyle(fontSize: 16, color:const Color.fromARGB(255, 248, 248, 248)),
              ),
            ),
            SizedBox(height: 32),
            Expanded(
              child: ListView.builder(
                itemCount: _sleepRecords.length,
                itemBuilder: (context, index) {
                  final record = _sleepRecords[index];
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    elevation: 4,
                    child: ListTile(
                      contentPadding: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                      title: Text(
                        'Dia: ${record['date']}',
                        style: TextStyle(
                          fontSize: 13,
                          color: const Color.fromARGB(255, 27, 27, 27),
                        ),
                      ),
                      subtitle: Text(
                        'Dormiu: ${record['sleepTime']} - Acordou: ${record['wakeUpTime']}',
                        style: TextStyle(fontSize: 16, color: const Color.fromARGB(255, 27, 27, 27)),
                      ),
                    ),
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
