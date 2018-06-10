<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180513122745 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE cards_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE questions_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE labels_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE quizzes_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE cards (id INT NOT NULL, sentence VARCHAR(255) NOT NULL, answer VARCHAR(255) NOT NULL, level INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cards_labels (card_id INT NOT NULL, label_id INT NOT NULL, PRIMARY KEY(card_id, label_id))');
        $this->addSql('CREATE INDEX IDX_B52118FD4ACC9A20 ON cards_labels (card_id)');
        $this->addSql('CREATE INDEX IDX_B52118FD33B92F39 ON cards_labels (label_id)');
        $this->addSql('CREATE TABLE questions (id INT NOT NULL, quiz_id INT NOT NULL, card_id INT NOT NULL, response VARCHAR(255) DEFAULT NULL, is_answer_right BOOLEAN DEFAULT \'false\', created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8ADC54D5853CD175 ON questions (quiz_id)');
        $this->addSql('CREATE INDEX IDX_8ADC54D54ACC9A20 ON questions (card_id)');
        $this->addSql('CREATE TABLE labels (id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE quizzes (id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE cards_labels ADD CONSTRAINT FK_B52118FD4ACC9A20 FOREIGN KEY (card_id) REFERENCES cards (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cards_labels ADD CONSTRAINT FK_B52118FD33B92F39 FOREIGN KEY (label_id) REFERENCES labels (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE questions ADD CONSTRAINT FK_8ADC54D5853CD175 FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE questions ADD CONSTRAINT FK_8ADC54D54ACC9A20 FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cards_labels DROP CONSTRAINT FK_B52118FD4ACC9A20');
        $this->addSql('ALTER TABLE questions DROP CONSTRAINT FK_8ADC54D54ACC9A20');
        $this->addSql('ALTER TABLE cards_labels DROP CONSTRAINT FK_B52118FD33B92F39');
        $this->addSql('ALTER TABLE questions DROP CONSTRAINT FK_8ADC54D5853CD175');
        $this->addSql('DROP SEQUENCE cards_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE questions_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE labels_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE quizzes_id_seq CASCADE');
        $this->addSql('DROP TABLE cards');
        $this->addSql('DROP TABLE cards_labels');
        $this->addSql('DROP TABLE questions');
        $this->addSql('DROP TABLE labels');
        $this->addSql('DROP TABLE quizzes');
    }
}
