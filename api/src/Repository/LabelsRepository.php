<?php

namespace App\Repository;

use App\Entity\Label;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Label find($id, $lockMode = null, $lockVersion = null)
 */
class LabelsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Label::class);
    }

    /**
     * @param array $labelIds
     *
     * @return ArrayCollection|Label[]
     */
    public function findByLabelIds(array $labelIds): ArrayCollection
    {
        $labels = $this->findBy(['id' => $labelIds]);

        return new ArrayCollection($labels);
    }
}
