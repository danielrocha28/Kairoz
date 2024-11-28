import 'package:flutter/material.dart';
import 'package:kairoz/pages/agenda_page.dart';
import 'package:kairoz/pages/home_page.dart';
import 'package:kairoz/pages/login_page.dart';
import 'package:kairoz/pages/profile_page.dart';
import 'package:kairoz/pages/register_page.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:kairoz/pages/estudos_page.dart';

void main() async {
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kairoz',
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      locale: const Locale('pt', 'BR'),
      routes: {
        '/agenda': (context) => const AgendaPage(),
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegisterPage(),
        '/home': (context) => const HomePage(),
        '/profile': (context) => const ProfilePage(),
        '/study': (context) => const EstudosPage(),
      },
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 82, 22, 185),
        ),
        useMaterial3: true,
      ),
    );
  }
}
