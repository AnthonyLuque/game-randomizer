package com.example.gamerandomizer.config;

import com.example.gamerandomizer.model.Criterion;
import com.example.gamerandomizer.model.Game;
import com.example.gamerandomizer.model.Player;
import com.example.gamerandomizer.repository.CriterionRepository;
import com.example.gamerandomizer.repository.GameRepository;
import com.example.gamerandomizer.repository.PlayerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            CriterionRepository criterionRepo,
            GameRepository gameRepo,
            PlayerRepository playerRepo) {

        return args -> {

            // 1. Créer les critères
            Criterion strategie = criterionRepo.save(new Criterion("Stratégie"));
            Criterion reflexion = criterionRepo.save(new Criterion("Réflexion"));
            Criterion aventure = criterionRepo.save(new Criterion("Aventure"));
            Criterion action = criterionRepo.save(new Criterion("Action"));
            Criterion coop = criterionRepo.save(new Criterion("Coop"));
            Criterion rpg = criterionRepo.save(new Criterion("RPG"));
            Criterion gestion = criterionRepo.save(new Criterion("Gestion"));

            // 2. Créer les jeux avec leurs critères
            Game minecraft = new Game("Minecraft");
            minecraft.getCriteria().add(aventure);
            gameRepo.save(minecraft);

            Game microworks = new Game("MicroWorks");
            microworks.getCriteria().add(reflexion);
            gameRepo.save(microworks);

            Game zelda = new Game("The Legend of Zelda: Breath of the Wild");
            zelda.getCriteria().addAll(List.of(aventure, rpg));
            gameRepo.save(zelda);

            Game civ = new Game("Civilization VI");
            civ.getCriteria().addAll(List.of(strategie, reflexion, gestion));
            gameRepo.save(civ);

            Game darkSouls = new Game("Dark Souls III");
            darkSouls.getCriteria().addAll(List.of(reflexion, action, rpg));
            gameRepo.save(darkSouls);

            Game overcooked = new Game("Overcooked! 2");
            overcooked.getCriteria().addAll(List.of(action, coop));
            gameRepo.save(overcooked);

            // 3. Créer les joueurs avec leurs jeux
            Player dapm = new Player("DAPM");
            dapm.getGamesOwned().addAll(List.of(minecraft, microworks, civ, overcooked));
            playerRepo.save(dapm);

            Player lokheo = new Player("Lokhéo");
            lokheo.getGamesOwned().addAll(List.of(minecraft, microworks, zelda, overcooked));
            playerRepo.save(lokheo);

            Player aeknio = new Player("AEKNIO");
            aeknio.getGamesOwned().addAll(List.of(minecraft, microworks, darkSouls, overcooked));
            playerRepo.save(aeknio);

            Player magivra = new Player("Magivra");
            magivra.getGamesOwned().addAll(List.of(minecraft, microworks, civ, overcooked));
            playerRepo.save(magivra);

            Player mirazonshi = new Player("MiraZonshi");
            mirazonshi.getGamesOwned().addAll(List.of(microworks, civ));
            playerRepo.save(mirazonshi);

            Player romain = new Player("Romain");
            romain.getGamesOwned().addAll(List.of(minecraft, microworks, darkSouls, overcooked));
            playerRepo.save(romain);

            Player feyriss = new Player("Feyriss");
            feyriss.getGamesOwned().add(minecraft);
            playerRepo.save(feyriss);

            System.out.println("✅ Données de test insérées !");
            
        };
    }
}