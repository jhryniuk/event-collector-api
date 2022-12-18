<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['read']], denormalizationContext: ['groups' => ['write']])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['read', 'write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private array $roles = [];
    #[ORM\ManyToMany(targetEntity: Event::class, mappedBy: 'owners')]
    #[ApiProperty]
    #[Groups(['read', 'write'])]
    private Collection $eventsOwner;

    #[ORM\ManyToMany(targetEntity: Event::class, mappedBy: 'participants')]
    #[ApiProperty]
    #[Groups(['read', 'write'])]
    private Collection $assignedToEvents;

    public function __construct()
    {
        $this->eventsOwner = new ArrayCollection();
        $this->assignedToEvents = new ArrayCollection();
    }

    /**
     * @var string|null $password The password
     */
    #[ORM\Column]
    #[Groups('write')]
    private ?string $password = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getEventsOwner(): Collection
    {
        return $this->eventsOwner;
    }

    /**
     * @param array $events
     */
    public function setEventsOwner(array $events): void
    {
        /** @var Event $event */
        foreach ($this->eventsOwner as $event) {
            $event->removeOwner($this);
        }
        /** @var Event $event */
        foreach ($events as $event) {
            $event->addOwner($this);
        }
    }

    /**
     * @return Collection
     */
    public function getAssignedToEvents(): Collection
    {
        return $this->assignedToEvents;
    }

    /**
     * @param array $events
     */
    public function setAssignedToEvents(array $events): void
    {
        /** @var Event $event */
        foreach ($this->assignedToEvents as $event) {
            $event->removeParticipant($this);
        }
        /** @var Event $event */
        foreach ($events as $event) {
            $event->addParticipant($this);
        }
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
