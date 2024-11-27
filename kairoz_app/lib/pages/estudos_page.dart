import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kairoz/pages/detalhes_page.dart';
import 'package:kairoz/widgets/banner.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:kairoz/pages/agenda_page.dart';

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
        'corTexto': const Color.fromARGB(255, 82, 22, 185),
        'descricao': [
          'Divida o estudo em blocos de 25 minutos.',
          'Faça uma pausa curta de 5 minutos após cada bloco.',
          'Após 4 blocos, faça uma pausa mais longa de 15-30 minutos.'
        ],
        'detalhesId': 'pomodoro',
      },
      {
        'texto': 'Técnica de Feynman!',
        'corTexto': const Color.fromARGB(255, 82, 22, 185),
        'descricao': [
          'Escolha um tópico e estude-o profundamente.',
          'Explique o conceito com suas próprias palavras.',
          'Identifique lacunas no conhecimento e revise.'
        ],
        'detalhesId': 'feynman',
      },
      {
        'texto': 'Técnica de Pareto',
        'corTexto': const Color.fromARGB(255, 82, 22, 185),
        'descricao': [
          'Identifique os 20% de esforços que geram 80% dos resultados.',
          'Priorize atividades de maior impacto.',
          'Elimine tarefas menos relevantes.'
        ],
        'detalhesId': 'pareto',
      },
      {
        'texto': 'Estudo Intercalado',
        'corTexto': const Color.fromARGB(255, 82, 22, 185),
        'descricao': [
          'Alterne entre diferentes tópicos ou habilidades.',
          'Ajuda a reforçar conexões entre conceitos.',
          'Evita monotonia e melhora a retenção.'
        ],
        'detalhesId': 'intercalado',
      },
    ];

    return Container(
      padding: const EdgeInsets.only(top: 10),
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
                        CupertinoPageRoute(
                          builder: (context) => const AgendaPage(),
                        ),
                      ),
                    }),
          ),
          const Padding(
            padding: EdgeInsets.only(left: 20, right: 20),
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
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) {
                          return CupertinoAlertDialog(
                            title: Text(
                              bloco['texto'],
                              style: TextStyle(
                                color: bloco['corTexto'] ?? Colors.black,
                              ),
                            ),
                            content: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ...bloco['descricao']
                                    .map<Widget>((desc) => Text('• $desc'))
                                    .toList(),
                              ],
                            ),
                            actions: [
                              CupertinoDialogAction(
                                child: const Text(
                                  'Fechar',
                                  style: TextStyle(
                                      color: Color.fromARGB(255, 82, 22, 185)),
                                ),
                                onPressed: () => Navigator.pop(context),
                              ),
                              CupertinoDialogAction(
                                child: const Text(
                                  'Mais Informações',
                                  style: TextStyle(
                                      color: Color.fromARGB(255, 82, 22, 185)),
                                ),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    CupertinoPageRoute(
                                      builder: (context) => DetalhesPage(
                                        titulo: bloco['texto'],
                                        detalhesId: bloco['detalhesId'],
                                      ),
                                    ),
                                  );
                                },
                              ),
                            ],
                          );
                        },
                      );
                    },
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
                            fontSize: 14,
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
