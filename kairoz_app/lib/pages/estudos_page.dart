import 'package:kairoz/pages/agenda_page.dart';
import 'package:kairoz/pages/home_page.dart';
import 'package:kairoz/pages/login_page.dart';
import 'package:kairoz/pages/register_page.dart';
import 'package:kairoz/widgets/banner.dart';
import 'package:flutter/cupertino.dart';
import 'package:kairoz/widgets/week_display.dart';

class EstudosPage extends StatefulWidget {
  const EstudosPage({super.key});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> blocos = [
      {
        'texto': 'Método Pomodoro!',
        'onTap': () {
          Navigator.push(
            context,
            CupertinoPageRoute(builder: (context) => const LoginPage()),
          );
        },
      },
      {
        'texto': 'Técnica de Feynman!',
        'onTap': () {
          Navigator.push(
            context,
            CupertinoPageRoute(builder: (context) => const RegisterPage()),
          );
        },
      },
      {
        'texto': 'Tecnica de Pareto ',
        'onTap': () {
          Navigator.push(
            context,
            CupertinoPageRoute(builder: (context) => const HomePage()),
          );
        },
      },
      {
        'texto': 'Estudo Intercalado',
        'onTap': () {
          Navigator.push(
            context,
            CupertinoPageRoute(builder: (context) => const AgendaPage()),
          );
        },
      },
    ];

    return Container(
      padding: const EdgeInsets.only(top: 20),
      child: ListView(
        children: [
          const SizedBox(height: 10),
          const SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: WeekDisplay(),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: BannerWidget(
              title: "Agenda",
              imageUrl: "assets/fundo1.jpg",
              onTap: () => {
                Navigator.push(
                  context,
                  CupertinoPageRoute(builder: (context) => const AgendaPage()),
                ),
              },
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(
              left: 20,
              right: 20,
            ),
            child: Text(
              'Técnicas de Estudo',
              textAlign: TextAlign.start,
              style: TextStyle(
                color: Color.fromARGB(255, 82, 22, 185),
              ),
            ),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.only(left: 10),
            child: Row(
              children: List.generate(
                blocos.length,
                (index) {
                  final bloco = blocos[index];
                  return GestureDetector(
                    onTap: bloco['onTap'],
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(
                          width: 1,
                          color: const Color.fromARGB(255, 82, 22, 185),
                        ),
                      ),
                      width: 100,
                      height: 120,
                      margin: const EdgeInsets.only(right: 10),
                      child: Center(
                        child: Text(
                          bloco['texto'],
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: Color.fromARGB(255, 82, 22, 185),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
