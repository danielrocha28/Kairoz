import 'package:flutter/material.dart';
import 'package:kairoz/widgets/drawer.dart';
import 'profile_page.dart';
import 'package:kairoz/widgets/nav_bar.dart';
import 'package:kairoz/pages/estudos_page.dart';
import 'package:kairoz/pages/saude_page.dart';
import 'package:kairoz/pages/trabalho_page.dart';
import 'package:kairoz/pages/lazer_page.dart';
import 'package:kairoz/widgets/appbar.dart';
import 'package:kairoz/pages/dashboard_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 4;

  void goToHomePage() {
    Navigator.pushNamed(context, '/home');
  }

  void goToProfilePage() {
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfilePage(),
      ),
    );
  }

  void signOut() {
    Navigator.pushNamedAndRemoveUntil(
        context, '/login', ModalRoute.withName('/'));
  }

  void navigateToPage(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffE4E1F3),
      bottomNavigationBar: CustomBottomNavBar(
        selectedIndex: _selectedIndex,
        onTabChange: navigateToPage,
      ),
      appBar: const MyAppBar(
        title: "Kairoz",
        iconTheme: IconThemeData(color: Colors.white),
      ),
      drawer: MyDrawer(
        foregroundColor: Colors.white,
        onHomeTap: goToHomePage,
        onProfileTap: goToProfilePage,
        onSignOut: signOut,
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: const <Widget>[
          EstudosPage(),
          SaudePage(),
          TrabalhoPage(),
          LazerPage(),
          DashboardPage()
        ],
      ),
    );
  }
}
