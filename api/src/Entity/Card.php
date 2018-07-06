<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\QuestionResponse;


/**
 * @ORM\Table(
 *  name="cards"
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CardsRepository")
 * @ORM\HasLifecycleCallbacks
 *
 * @ApiResource(
 *     graphql={
 *          "query",
 *          "delete",
 *          "update",
 *          "create",
 *          "answer"={
 *              "controller"=QuestionResponse::class
 *          }
 *     }
 * )
 */
class Card
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
     * @var string
     *
     * @ORM\Column(name="sentence", type="string", length=255, nullable=false)
     */
    private $sentence;

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="string", length=255, nullable=false)
     */
    private $answer;

    /**
     * @var Collection|Question[]
     *
     * @ORM\OneToMany(targetEntity="Question", mappedBy="sentence")
     */
    private $questions;

    /**
     * @var Collection|Label[]
     *
     * @ORM\ManyToMany(targetEntity="Label", inversedBy="cards")
     * @ORM\JoinTable(name="cards_labels",
     *      joinColumns={@ORM\JoinColumn(name="card_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="label_id", referencedColumnName="id")}
     * )
     */
    private $labels;

    /**
     * @var int|null
     *
     * @ORM\Column(name="level", type="integer", nullable=true)
     */
    private $level = null;

    public function __construct()
    {
        $this->labels = new ArrayCollection();
        $this->questions = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getSentence(): string
    {
        return $this->sentence;
    }

    public function setSentence(string $sentence): Card
    {
        $this->sentence = $sentence;

        return $this;
    }

    public function getAnswer(): string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): Card
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * @return Card[]|Collection
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    /**
     * @return Label[]|Collection
     */
    public function getLabels(): Collection
    {
        return $this->labels;
    }

    public function setLabels(Collection $labels): Card
    {
        $this->labels = $labels;

        return $this;
    }

    public function addLabel(Label $label): Card
    {
        $this->labels->add($label);

        return $this;
    }

    public function removeLabel(Label $label): Card
    {
        $this->labels->removeElement($label);

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level = null): Card
    {
        $this->level = $level;

        return $this;
    }
}
