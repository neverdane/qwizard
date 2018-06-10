<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\QuizGeneration;

/**
 * @ORM\Table(
 *  name="quizzes"
 * )
 * @ORM\Entity(repositoryClass="App\Repository\QuizzesRepository")
 * @ORM\HasLifecycleCallbacks
 *
 * @ApiResource(collectionOperations={
 *     "get",
 *     "post",
 *     "generate"={
 *         "method"="POST",
 *         "path"="/quizzes/generation",
 *         "controller"=QuizGeneration::class,
 *         "defaults"={"_api_receive"=false}
 *     }
 * })
 */
class Quiz
{
    use Timestampable;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var Collection|Question[]
     *
     * @ORM\OneToMany(targetEntity="Question", mappedBy="quiz", cascade={"persist"})
     */
    private $questions;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): Quiz
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return Question[]|Collection
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    /**
     * @param Question[]|Collection $questions
     *
     * @return Quiz
     */
    public function setQuestions(Collection $questions): Quiz
    {
        $this->questions = $questions;

        return $this;
    }

    public function addQuestion(Question $question): Quiz
    {
        $this->questions->add($question);

        return $this;
    }

    public function removeQuestion(Question $question): Quiz
    {
        $this->questions->removeElement($question);

        return $this;
    }

}
