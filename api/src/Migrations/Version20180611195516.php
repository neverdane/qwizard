<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180611195516 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE cards ALTER created_at DROP NOT NULL');
        $this->addSql('ALTER TABLE cards ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE questions ALTER created_at DROP NOT NULL');
        $this->addSql('ALTER TABLE questions ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE labels ALTER created_at DROP NOT NULL');
        $this->addSql('ALTER TABLE labels ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE quizzes ALTER created_at DROP NOT NULL');
        $this->addSql('ALTER TABLE quizzes ALTER updated_at DROP NOT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE labels ALTER created_at SET NOT NULL');
        $this->addSql('ALTER TABLE labels ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE quizzes ALTER created_at SET NOT NULL');
        $this->addSql('ALTER TABLE quizzes ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE cards ALTER created_at SET NOT NULL');
        $this->addSql('ALTER TABLE cards ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE questions ALTER created_at SET NOT NULL');
        $this->addSql('ALTER TABLE questions ALTER updated_at SET NOT NULL');
    }
}
