<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Quiz;
use App\Repository\CardsRepository;
use Doctrine\ORM\EntityManagerInterface;

class QuestionResponse
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
        die($data);
    }
}
