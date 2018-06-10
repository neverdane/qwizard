<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Quiz;
use App\Repository\CardsRepository;
use Doctrine\ORM\EntityManagerInterface;

class QuizGeneration
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var CardsRepository
     */
    private $cardsRepository;

    public function __construct(EntityManagerInterface $entityManager, CardsRepository $cardsRepository)
    {
        $this->entityManager = $entityManager;
        $this->cardsRepository = $cardsRepository;
    }

    public function __invoke($data = null)
    {
        $quiz = new Quiz();

        $electedCards = $this->cardsRepository->findRandomCards(3);

        foreach ($electedCards as $card) {
            $quiz->addQuestion((new Question())->setCard($card)->setQuiz($quiz));
        }

        $this->entityManager->persist($quiz);
        $this->entityManager->flush();

        return $quiz;
    }
}
