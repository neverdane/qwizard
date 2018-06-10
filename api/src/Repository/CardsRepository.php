<?php

namespace App\Repository;

use App\Entity\Card;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Card find($id, $lockMode = null, $lockVersion = null)
 */
class CardsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Card::class);
    }

    public function countBy(array $criteria): int
    {
        $persister = $this->_em->getUnitOfWork()->getEntityPersister($this->_entityName);

        return $persister->count($criteria);
    }

    /**
     * @param int $count
     *
     * @return ArrayCollection|Card[]
     *
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findRandomCards(int $count = 1): ArrayCollection
    {
        $questions = new ArrayCollection();
        $questionsCounter = $count;
        $questionsCount = $this->countBy([]);
        $pickedQuestionIds = [];

        for ($i = $questionsCounter; $i > 0 && $questionsCount > 0; $i--) {
            $queryBuilder = $this->createQueryBuilder('q');

            if (!empty($pickedQuestionIds)) {
                $queryBuilder = $queryBuilder
                    ->where($queryBuilder->expr()->notIn('q.id', $pickedQuestionIds));
            }

            $question = $queryBuilder
                ->setFirstResult(rand(0, $questionsCount - 1))
                ->getQuery()
                ->setMaxResults(1)
                ->getSingleResult();

            --$questionsCount;

            $pickedQuestionIds[] = $question->getId();
            $questions->add($question);
        }

        return $questions;
    }
}
