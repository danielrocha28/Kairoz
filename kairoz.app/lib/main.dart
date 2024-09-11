import 'package:flutter/material.dart';
import 'package:kairoz/pages/home_page.dart';
import 'package:kairoz/pages/register_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kairoz',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const RegisterPage(),
        '/home': (context) => const HomePage(),
      },
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 82, 22, 185),
        ),
        useMaterial3: true,
      ),
      // home: const RegisterPage(),
    );
  }
}
